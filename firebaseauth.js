// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbk5ZhPUbKILa4oYv7aGfA9Tsx7upBwqk",
    authDomain: "phibmat-a468d.firebaseapp.com",
    projectId: "phibmat-a468d",
    storageBucket: "phibmat-a468d.appspot.com",
    messagingSenderId: "299437385188",
    appId: "1:299437385188:web:206fdfa4d4fc39263c53f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Sign-Up Function
document.getElementById("submitSignUp").addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.getElementById("name").value;
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //  Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email
        });

        //  Save user ID to local storage
        localStorage.setItem("userID", user.uid);

        alert("Account created successfully!");
        window.location.href = "home.html"; // Redirect to homepage
    } catch (error) {
        console.error("Sign-up error:", error.message);
        alert(error.message);
    }
});

//  Sign-In Function
document.getElementById("submitSignIn").addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user ID to local storage
        localStorage.setItem("userID", user.uid);

        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to homepage
    } catch (error) {
        console.error("Sign-in error:", error.message);
        alert(error.message);
    }
});

// Function to Display User Name on Homepage
async function displayUserName() {
    const userId = localStorage.getItem("userID");

    if (userId) {
        try {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                document.getElementById("nom").innerText = userSnap.data().username;
            } else {
                document.getElementById("nom").innerText = "User";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            document.getElementById("nom").innerText = "Error";
        }
    } else {
        document.getElementById("nom").innerText = "Guest";
    }
}

// Check Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("userID", user.uid);
        displayUserName();
    } else {
        localStorage.removeItem("userID");
        document.getElementById("nom").innerText = "Guest";
    }
});





