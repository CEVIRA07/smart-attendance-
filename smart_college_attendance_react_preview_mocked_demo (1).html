import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Fingerprint, Camera, LogIn, UserPlus, ShieldCheck, CalendarDays, Percent, BookX } from "lucide-react";

// ==========================
// UTILITIES (Mock Backend)
// ==========================
const LS_USERS_KEY = "sca_users_v1"; // users indexed by collegeId
const LS_SESS_KEY = "sca_session_v1"; // active session (collegeId)
const LS_ATT_KEY_PREFIX = "sca_att_"; // attendance per collegeId

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}
function getUser(id) {
  const users = loadUsers();
  return users[id] || null;
}
function upsertUser(user) {
  const users = loadUsers();
  users[user.collegeId] = user;
  saveUsers(users);
}
function setSession(collegeId) {
  localStorage.setItem(LS_SESS_KEY, collegeId);
}
function getSession() {
  return localStorage.getItem(LS_SESS_KEY);
}
function clearSession() {
  localStorage.removeItem(LS_SESS_KEY);
}
function getAttendanceKey(collegeId) {
  return `${LS_ATT_KEY_PREFIX}${collegeId}`;
}
function loadAttendance(collegeId) {
  try {
    return JSON.parse(localStorage.getItem(getAttendanceKey(collegeId)) || "[]");
  } catch {
    return [];
  }
}
function saveAttendance(collegeId, dates) {
  localStorage.setItem(getAttendanceKey(collegeId), JSON.stringify(dates));
}
function todayISO() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}
function isWeekday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun ... 6 Sat
  return day !== 0 && day !== 6;
}
function workingDaysCount(startDateISO, endDateISO) {
  const start = new Date(startDateISO);
  const end = new Date(endDateISO);
  let count = 0;
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (isWeekday(d)) count++;
  }
  return count;
}

// Default semester start = first day of current month (adjust as needed)
function defaultSemesterStart() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  return first.toISOString().slice(0, 10);
}

// ==========================
// WEBAUTHN HELPERS (Biometrics/Passkeys)
// ==========================
const encoder = new TextEncoder();

async function createWebAuthnCredential({ collegeId }) {
  if (!("credentials" in navigator) || !("PublicKeyCredential" in window)) return { ok: false, reason: "WebAuthn not supported" };
  try {
    const publicKey = {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp: { name: "Smart College Attendance", id: window.location.hostname || undefined },
      user: {
        id: encoder.encode(collegeId),
        name: collegeId,
        displayName: collegeId,
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
      authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "preferred" },
      timeout: 60000,
    };
    const cred = await navigator.credentials.create({ publicKey });
    if (!cred) return { ok: false, reason: "No credential returned" };
    // Persist a mock handle (in real life, send to server)
    const user = getUser(collegeId);
    user.webauthn = true;
    upsertUser(user);
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}

async function authenticateWithWebAuthn({ collegeId }) {
  if (!("credentials" in navigator) || !("PublicKeyCredential" in window)) return { ok: false, reason: "WebAuthn not supported" };
  try {
    const publicKey = {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      timeout: 60000,
      userVerification: "preferred",
      rpId: window.location.hostname || undefined,
      allowCredentials: [], // demo: platform authenticator
    };
    const assertion = await navigator.credentials.get({ publicKey });
    if (!assertion) return { ok: false, reason: "No assertion" };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e.message };
  }
}

// ==========================
// CAMERA (Mock Face Check)
// ==========================
function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (e) {
        setError(e.message || "Camera access denied");
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  const takeShot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) onCapture(blob);
    }, "image/jpeg", 0.9);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {error && (
        <Alert className="w-full max-w-md">
          <AlertTitle>Camera error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <video ref={videoRef} className="rounded-2xl w-full max-w-md shadow" playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
      <Button disabled={!ready} onClick={takeShot} className="w-full max-w-md">
        <Camera className="mr-2 h-4 w-4" /> Capture Selfie (Mock Face Check)
      </Button>
      <p className="text-xs text-muted-foreground max-w-md text-center">This demo records a selfie snapshot as a placeholder for facial recognition. In production, plug in a liveness + face-match service.</p>
    </div>
  );
}

// ==========================
// MAIN APP
// ==========================
export default function App() {
  const [view, setView] = useState("auth");
  const [step, setStep] = useState("login"); // login | register | verify | setpass
  const [form, setForm] = useState({ collegeId: "", email: "", phone: "", otp: "", password: "", confirm: "" });
  const [info, setInfo] = useState("");
  const [err, setErr] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [user, setUser] = useState(null);
  const [marking, setMarking] = useState(false);
  const [shotBlob, setShotBlob] = useState(null);
  const [waStatus, setWaStatus] = useState("");
  const [semStart, setSemStart] = useState(defaultSemesterStart());

  useEffect(() => {
    const sess = getSession();
    if (sess) {
      const u = getUser(sess);
      if (u) {
        setUser(u);
        setView("app");
      } else {
        clearSession();
      }
    }
  }, []);

  // Working days up to today (Mon–Fri)
  const workingDays = useMemo(() => workingDaysCount(semStart, todayISO()), [semStart]);
  const attendanceDates = useMemo(() => (user ? loadAttendance(user.collegeId) : []), [user]);
  const presentDays = attendanceDates.length;
  const absentDays = Math.max(0, workingDays - presentDays);
  const percentage = useMemo(() => {
    if (workingDays === 0) return 0;
    // As requested: (Attendance - Absent) / WorkingDays * 100
    return (((presentDays - absentDays) / workingDays) * 100).toFixed(2);
  }, [workingDays, presentDays, absentDays]);

  function updateField(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function doLogin() {
    setErr("");
    const u = getUser(form.collegeId.trim());
    if (!u) return setErr("Account not found. Please register first.");
    if (!u.password) return setErr("Password not set. Complete registration.");
    if (u.password !== form.password) return setErr("Invalid credentials.");
    setUser(u);
    setView("app");
    setInfo("");
    setErr("");
    setSession(u.collegeId);
  }

  function startRegister() {
    setStep("register");
    setErr("");
    setInfo("");
  }

  function sendOTP() {
    setErr("");
    const { collegeId, email, phone } = form;
    if (!collegeId || !email || !phone) return setErr("Fill all fields");
    // mock: generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setOtpCode(code);
    setOtpSent(true);
    setStep("verify");
    setInfo(`Mock OTP sent to ${email} & ${phone}: ${code}`);
  }

  function verifyOTP() {
    setErr("");
    if (form.otp !== otpCode) return setErr("Incorrect OTP");
    // Create/seed user record
    const u = getUser(form.collegeId) || { collegeId: form.collegeId };
    u.email = form.email;
    u.phone = form.phone;
    upsertUser(u);
    setStep("setpass");
    setInfo("OTP verified. Set your password.");
  }

  async function setPassword() {
    setErr("");
    if (!form.password || form.password.length < 6) return setErr("Password must be at least 6 characters");
    if (form.password !== form.confirm) return setErr("Passwords do not match");
    const u = getUser(form.collegeId);
    if (!u) return setErr("User not found during setup");
    u.password = form.password;
    upsertUser(u);
    setInfo("Password set. Optionally register your device biometrics.");
    // Try WebAuthn registration (biometrics/passkey)
    setWaStatus("Registering biometrics...");
    const res = await createWebAuthnCredential({ collegeId: u.collegeId });
    if (res.ok) setWaStatus("Biometric/Passkey registered on this device.");
    else setWaStatus(`Biometric registration skipped: ${res.reason}`);
    setUser(u);
    setView("app");
    setSession(u.collegeId);
  }

  async function markAttendance() {
    setErr("");
    setInfo("");
    setMarking(true);
    try {
      // 1) Capture selfie (mock face)
      if (!shotBlob) throw new Error("Please capture a selfie first");
      // 2) Prompt biometrics / device unlock via WebAuthn
      const wa = await authenticateWithWebAuthn({ collegeId: user.collegeId });
      if (!wa.ok) throw new Error("Biometric/Passkey auth failed or not available");
      // 3) Save attendance for today if weekday
      const day = todayISO();
      if (!isWeekday(day)) throw new Error("Today is not a working day (weekend)");
      const dates = loadAttendance(user.collegeId);
      if (!dates.includes(day)) {
        dates.push(day);
        saveAttendance(user.collegeId, dates);
      }
      setInfo("Attendance marked successfully for today.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setMarking(false);
    }
  }

  function logout() {
    clearSession();
    setUser(null);
    setView("auth");
    setStep("login");
    setForm({ collegeId: "", email: "", phone: "", otp: "", password: "", confirm: "" });
    setInfo("");
    setErr("");
  }

  const Header = (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Smart College Attendance</h1>
          <p className="text-sm text-muted-foreground">Demo prototype — email/SMS, real face recognition & server are mocked.</p>
        </div>
        {user && (
          <div className="text-right">
            <div className="font-medium">{user.collegeId}</div>
            <Button variant="secondary" className="mt-2" onClick={logout}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );

  if (view === "auth") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
        {Header}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LogIn className="h-5 w-5"/> Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="College ID" value={form.collegeId} onChange={e=>updateField("collegeId", e.target.value)} />
              <Input type="password" placeholder="Password" value={form.password} onChange={e=>updateField("password", e.target.value)} />
              <div className="flex gap-2">
                <Button className="flex-1" onClick={doLogin}>Login</Button>
                <Button variant="outline" className="flex-1" onClick={startRegister}><UserPlus className="h-4 w-4 mr-2"/> Register</Button>
              </div>
              {err && <p className="text-sm text-red-600">{err}</p>}
              {info && <p className="text-sm text-green-600">{info}</p>}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> First-Time Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {step === "register" && (
                <div className="space-y-3">
                  <Input placeholder="College ID" value={form.collegeId} onChange={e=>updateField("collegeId", e.target.value)} />
                  <Input placeholder="College Email" value={form.email} onChange={e=>updateField("email", e.target.value)} />
                  <Input placeholder="Mobile Number" value={form.phone} onChange={e=>updateField("phone", e.target.value)} />
                  <Button onClick={sendOTP}>Send OTP</Button>
                </div>
              )}
              {step === "verify" && (
                <div className="space-y-3">
                  <Alert>
                    <AlertTitle>Mock OTP</AlertTitle>
                    <AlertDescription>{info}</AlertDescription>
                  </Alert>
                  <Input placeholder="Enter 6-digit OTP" value={form.otp} onChange={e=>updateField("otp", e.target.value)} />
                  <Button onClick={verifyOTP}>Verify</Button>
                </div>
              )}
              {step === "setpass" && (
                <div className="space-y-3">
                  <Input type="password" placeholder="Create Password" value={form.password} onChange={e=>updateField("password", e.target.value)} />
                  <Input type="password" placeholder="Confirm Password" value={form.confirm} onChange={e=>updateField("confirm", e.target.value)} />
                  <Button onClick={setPassword}>Finish Setup</Button>
                  {waStatus && <p className="text-xs text-muted-foreground">{waStatus}</p>}
                </div>
              )}
              {err && <p className="text-sm text-red-600">{err}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // APP VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      {Header}

      <div className="max-w-5xl mx-auto mb-6">
        <Alert>
          <AlertTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Security & Hardware Access (Demo)</AlertTitle>
          <AlertDescription>
            <ul className="list-disc ml-5 text-sm">
              <li>Biometric thumb/fingerprint is handled via WebAuthn/Passkeys. On supported phones, you will see a biometric prompt.</li>
              <li>Face recognition is mocked by capturing a selfie. Replace this with a proper liveness + face-match service in production.</li>
              <li>Email/SMS OTP is simulated. For real use, connect your backend (Node/Express), a database, and providers like SendGrid/Twilio.</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <Tabs defaultValue="attendance" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="attendance" className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Attendance</TabsTrigger>
          <TabsTrigger value="absent" className="flex items-center gap-2"><BookX className="h-4 w-4"/> Total Absent</TabsTrigger>
          <TabsTrigger value="percent" className="flex items-center gap-2"><Percent className="h-4 w-4"/> Percentage</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid lg:grid-cols-2 gap-6 mt-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Camera className="h-5 w-5"/> Step 1: Capture Selfie</CardTitle>
              </CardHeader>
              <CardContent>
                <CameraCapture onCapture={(blob)=>setShotBlob(blob)} />
                {shotBlob && (
                  <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="h-4 w-4"/> Selfie captured
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Fingerprint className="h-5 w-5"/> Step 2: Biometric / Passkey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Tap to authenticate with your phone's biometrics (thumb/face/PIN) using WebAuthn.</p>
                <Button onClick={markAttendance} disabled={marking} className="w-full">
                  {marking ? "Marking..." : "Authenticate & Mark Attendance"}
                </Button>
                {err && <p className="text-sm text-red-600">{err}</p>}
                {info && <p className="text-sm text-green-600">{info}</p>}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <StatCard title="Working Days" value={workingDays} />
            <StatCard title="Present" value={presentDays} />
            <StatCard title="Absent" value={absentDays} />
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Log</CardTitle>
              </CardHeader>
              <CardContent>
                {attendanceDates.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No days marked yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {attendanceDates.map(d => (
                      <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="absent">
          <div className="mt-6">
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Total No. of Days Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">{absentDays}</div>
                <p className="text-sm text-muted-foreground mt-2">Calculated as: Working Days - Attendance</p>
                <div className="mt-4">
                  <label className="text-sm">Semester start date</label>
                  <Input type="date" value={semStart} onChange={e=>setSemStart(e.target.value)} className="mt-2 w-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="percent">
          <div className="mt-6">
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Attendance Percentage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">{percentage}%</div>
                <p className="text-sm text-muted-foreground mt-2">Formula used: (Attendance - Absent) / Working Days × 100</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="max-w-5xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Implementation Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-5 text-sm space-y-1">
              <li><b>Data:</b> Stored locally in your browser for demo (localStorage). Replace with a real database (e.g., PostgreSQL) on the server.</li>
              <li><b>Biometrics:</b> WebAuthn is the standards-based way to use device biometrics (thumb/face) on the web. Many Android/iOS devices support it.</li>
              <li><b>Face Check:</b> The selfie capture here is a placeholder. For production, integrate a liveness + face match provider or run your own model.</li>
              <li><b>Working Days:</b> Weekdays (Mon–Fri) from the chosen start date to today.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
