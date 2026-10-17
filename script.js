  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();



    emailjs.send("service_eu5oz35", "template_q5tz4bp", {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("time").value,
      message: document.getElementById("message").value
    })
    .then(function(response) {
      alert("✅ Email sent successfully!");
      console.log("SUCCESS", response); 
    }, function(error) {

      alert("❌ Failed to send email.");
      console.log("FAILED", error);
    });
  });

