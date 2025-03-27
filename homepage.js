
        // Import Firebase modules
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
        import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

        // Firebase Configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCbk5ZhPUbKILa4oYv7aGfA9Tsx7upBwqk",
            authDomain: "phibmat-a468d.firebaseapp.com",
            projectId: "phibmat-a468d",
            storageBucket: "phibmat-a468d.firebasestorage.app",
            messagingSenderId: "299437385188",
            appId: "1:299437385188:web:206fdfa4d4fc39263c53f1"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Function to display the user's name using local storage
        async function displayUserName() {
            const userId = localStorage.getItem("userID");
            
            if (!userId) {
                document.getElementById("nom").innerText = "Guest";
                return;
            }

            try {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    document.getElementById("nom").innerText = userSnap.data().username || "User";
                } else {
                    document.getElementById("nom").innerText = "User";
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                document.getElementById("nom").innerText = "Error";
            }
        }

        // Check authentication state
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem("userID", user.uid);
                displayUserName();
            } else {
                localStorage.removeItem("userID");
                document.getElementById("nom").innerText = "Guest";
            }
        });

        // Call function on page load to fetch username
        displayUserName();

        // Logout function
        window.logout = async function () {
            try {
                await signOut(auth);
                localStorage.removeItem("userID");
                window.location.href = "index.html"; // Redirect to login page after logout
            } catch (error) {
                console.error("Logout error:", error);
            }
        };

