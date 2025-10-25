
const SUPABASE_URL = "https://wpcgtpqyusxsuqpdqiki.supabase.co
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwY2d0cHF5dXN4c3VxcGRxaWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTA4MDgsImV4cCI6MjA3Njk2NjgwOH0.hSpBurHbnL56CtUcHK9_dQBzZ5VlHcWTtjCipd9FwoM";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const loginSection = document.getElementById("loginSection");
const mainContainer = document.querySelector(".main-container");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signOutBtn = document.getElementById("signOutBtn");


mainContainer.style.display = "none";


signUpBtn.addEventListener("click", async () => {
  const { data, error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  });
  if (error) alert(error.message);
  else alert("Check your email to confirm your account!");
});


signInBtn.addEventListener("click", async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });
  if (error) alert(error.message);
});


signOutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
});


supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    loginSection.style.display = "none";
    mainContainer.style.display = "flex";
  } else {
    loginSection.style.display = "flex";
    mainContainer.style.display = "none";
  }
});
