// Single responsibility: all Firebase CRUD operations — the only file that touches the Firebase SDK.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection, doc, getDoc, getDocs, setDoc, deleteDoc, addDoc,
  query, where, orderBy, limit, writeBatch,
  enableIndexedDbPersistence,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL, deleteObject,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';
import { firebaseConfig } from './config.js';

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);
const storage = getStorage(app);

enableIndexedDbPersistence(db).catch(() => {}); // offline support — ignore multi-tab warning

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Converts a Firestore DocumentSnapshot → plain JS object with id. */
function snap(docSnap) {
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

/** Converts a QuerySnapshot → array of plain JS objects. */
function snapAll(querySnap) {
  return querySnap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Wraps an async fn so every exported call rejects with a typed error. */
function guard(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (cause) {
      const message = cause?.message ?? String(cause);
      return Promise.reject({ code: 'API_ERROR', message, cause });
    }
  };
}

const now = () => new Date().toISOString();

// ---------------------------------------------------------------------------
// Owners
// ---------------------------------------------------------------------------

const ownersCol = () => collection(db, 'owners');

const getOwners = guard(async () => {
  const q = query(ownersCol(), orderBy('name', 'asc'));
  return snapAll(await getDocs(q));
});

const getOwner = guard(async (id) => {
  return snap(await getDoc(doc(db, 'owners', id)));
});

const saveOwner = guard(async (data) => {
  const ts = now();
  if (data.id) {
    const ref = doc(db, 'owners', data.id);
    await setDoc(ref, { ...data, updatedAt: ts }, { merge: true });
    return { ...data, updatedAt: ts };
  }
  const { id: _omit, ...payload } = data;
  const newRef = await addDoc(ownersCol(), { ...payload, createdAt: ts, updatedAt: ts });
  return { id: newRef.id, ...payload, createdAt: ts, updatedAt: ts };
});

/** Preview cascade — does NOT delete. */
const deleteOwner = guard(async (id) => {
  const owner = snap(await getDoc(doc(db, 'owners', id)));
  const patientSnaps = await getDocs(query(collection(db, 'patients'), where('ownerId', '==', id)));
  const patients = snapAll(patientSnaps);

  const visits = [];
  for (const patient of patients) {
    const vSnaps = await getDocs(query(collection(db, 'visits'), where('patientId', '==', patient.id)));
    visits.push(...snapAll(vSnaps));
  }

  return { owner, patients, visits };
});

/** Actual cascade delete using batched writes. */
const confirmDeleteOwner = guard(async (id) => {
  const patientSnaps = await getDocs(query(collection(db, 'patients'), where('ownerId', '==', id)));
  const patients = snapAll(patientSnaps);

  let visitCount = 0;
  const batch = writeBatch(db);

  for (const patient of patients) {
    const vSnaps = await getDocs(query(collection(db, 'visits'), where('patientId', '==', patient.id)));
    vSnaps.docs.forEach(v => { batch.delete(v.ref); visitCount++; });
    batch.delete(doc(db, 'patients', patient.id));
  }
  batch.delete(doc(db, 'owners', id));

  await batch.commit();
  return { visitCount, patientCount: patients.length };
});

// ---------------------------------------------------------------------------
// Patients
// ---------------------------------------------------------------------------

const patientsCol = () => collection(db, 'patients');

const getPatients = guard(async (ownerId) => {
  const q = query(patientsCol(), where('ownerId', '==', ownerId), orderBy('name', 'asc'));
  return snapAll(await getDocs(q));
});

const getAllPatients = guard(async () => {
  return snapAll(await getDocs(patientsCol()));
});

const getPatient = guard(async (id) => {
  return snap(await getDoc(doc(db, 'patients', id)));
});

const savePatient = guard(async (data) => {
  if (!data.ownerId) throw new Error('savePatient requires ownerId');
  const ts = now();
  if (data.id) {
    const ref = doc(db, 'patients', data.id);
    await setDoc(ref, { ...data, updatedAt: ts }, { merge: true });
    return { ...data, updatedAt: ts };
  }
  const { id: _omit, ...payload } = data;
  const newRef = await addDoc(patientsCol(), { ...payload, createdAt: ts, updatedAt: ts });
  return { id: newRef.id, ...payload, createdAt: ts, updatedAt: ts };
});

/** Preview cascade — does NOT delete. */
const deletePatient = guard(async (id) => {
  const patient = snap(await getDoc(doc(db, 'patients', id)));
  const vSnaps = await getDocs(query(collection(db, 'visits'), where('patientId', '==', id)));
  return { patient, visits: snapAll(vSnaps) };
});

const confirmDeletePatient = guard(async (id) => {
  const vSnaps = await getDocs(query(collection(db, 'visits'), where('patientId', '==', id)));
  const batch = writeBatch(db);
  vSnaps.docs.forEach(v => batch.delete(v.ref));
  batch.delete(doc(db, 'patients', id));
  await batch.commit();
  return { visitCount: vSnaps.size };
});

// ---------------------------------------------------------------------------
// Visits
// ---------------------------------------------------------------------------

const visitsCol = () => collection(db, 'visits');

const getVisits = guard(async (patientId) => {
  const q = query(visitsCol(), where('patientId', '==', patientId), orderBy('date', 'desc'));
  return snapAll(await getDocs(q));
});

const getVisit = guard(async (id) => {
  return snap(await getDoc(doc(db, 'visits', id)));
});

const saveVisit = guard(async (data) => {
  if (!data.patientId) throw new Error('saveVisit requires patientId');
  if (!data.type)      throw new Error('saveVisit requires type');
  const ts = now();
  const extra = data.kbVersion ? { kbVersion: data.kbVersion } : {};
  if (data.id) {
    const ref = doc(db, 'visits', data.id);
    await setDoc(ref, { ...data, ...extra, updatedAt: ts }, { merge: true });
    return { ...data, ...extra, updatedAt: ts };
  }
  const { id: _omit, ...payload } = data;
  const newRef = await addDoc(visitsCol(), { ...payload, ...extra, createdAt: ts, updatedAt: ts });
  return { id: newRef.id, ...payload, ...extra, createdAt: ts, updatedAt: ts };
});

const deleteVisit = guard(async (id) => {
  await deleteDoc(doc(db, 'visits', id));
  return { id };
});

const getRecentVisits = guard(async (limitN = 10) => {
  const q = query(visitsCol(), orderBy('date', 'desc'), limit(limitN));
  return snapAll(await getDocs(q));
});

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

const searchOwners = guard(async (q) => {
  if (!q) return [];
  const end = q.slice(0, -1) + String.fromCharCode(q.charCodeAt(q.length - 1) + 1);
  const qs = await getDocs(
    query(ownersCol(), orderBy('name'), where('name', '>=', q), where('name', '<', end))
  );
  return snapAll(qs);
});

const searchPatients = guard(async (q) => {
  if (!q) return [];
  const end = q.slice(0, -1) + String.fromCharCode(q.charCodeAt(q.length - 1) + 1);

  const [byName, byChip] = await Promise.all([
    getDocs(query(patientsCol(), orderBy('name'), where('name', '>=', q), where('name', '<', end))),
    getDocs(query(patientsCol(), orderBy('microchip'), where('microchip', '>=', q), where('microchip', '<', end))),
  ]);

  const seen = new Set();
  const results = [];
  for (const d of [...byName.docs, ...byChip.docs]) {
    if (!seen.has(d.id)) { seen.add(d.id); results.push({ id: d.id, ...d.data() }); }
  }
  return results;
});

// ---------------------------------------------------------------------------
// Attachments (Firebase Storage)
// ---------------------------------------------------------------------------

const uploadAttachment = guard(async (visitId, file) => {
  const storagePath = `attachments/${visitId}/${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { name: file.name, type: file.type, storagePath, url };
});

const deleteAttachment = guard(async (storagePath) => {
  await deleteObject(ref(storage, storagePath));
});

// ---------------------------------------------------------------------------
// Meta collection
// ---------------------------------------------------------------------------

const getMeta = guard(async (key) => {
  const d = await getDoc(doc(db, 'meta', key));
  return d.exists() ? d.data().value : null;
});

const setMeta = guard(async (key, value) => {
  await setDoc(doc(db, 'meta', key), { value, updatedAt: now() }, { merge: true });
});

// ---------------------------------------------------------------------------
// Singleton export + named re-exports
// ---------------------------------------------------------------------------

export const api = {
  // Owners
  getOwners, getOwner, saveOwner, deleteOwner, confirmDeleteOwner,
  // Patients
  getPatients, getAllPatients, getPatient, savePatient, deletePatient, confirmDeletePatient,
  // Visits
  getVisits, getVisit, saveVisit, deleteVisit, getRecentVisits,
  // Search
  searchOwners, searchPatients,
  // Attachments
  uploadAttachment, deleteAttachment,
  // Meta
  getMeta, setMeta,
};

export {
  getOwners, getOwner, saveOwner, deleteOwner, confirmDeleteOwner,
  getPatients, getAllPatients, getPatient, savePatient, deletePatient, confirmDeletePatient,
  getVisits, getVisit, saveVisit, deleteVisit, getRecentVisits,
  searchOwners, searchPatients,
  uploadAttachment, deleteAttachment,
  getMeta, setMeta,
};
