document.getElementById("signupForm").addEventListener("submit", async function (event) {
  event.preventDefault(); 

  
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const ph_num = document.getElementById("ph_num").value.trim();
  const gmail = document.getElementById("gmail").value.trim();

 
  if (!fname || !lname || !ph_num || !gmail) {
    alert("Please fill in all fields.");
    return;
  }

 
  try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname, lname, ph_num, gmail }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Signup successful!");
      console.log("Response:", data);


      document.getElementById("fname").value = '';
      document.getElementById("lname").value = '';
      document.getElementById("ph_num").value = '';
      document.getElementById("gmail").value = '';

       window.location.href = "gamepanel.html";  // Redirect to the game panel
    } else {
      const error = await response.json();
      alert("Signup failed: " + error.message);
    }
  } catch (err) {
    console.error("Error during signup:", err);
    alert("An error occurred. Please try again.");
  }
});
