function download(){
    // Selectors
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const course = document.getElementById("course").value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("hellp", 10, 10)

    const img = new Image()
    img.src = "469748197_613037524598124_3444171758591108752_n-removebg-preview.png"
    // img.onload = function(){
        doc.addImage(img, "png",0,0,70,40)
        doc.setFont("helvetica", "bolder");
        doc.setFontSize(21);
        doc.setTextColor("blue")
        doc.text("PHIBMAT STUDENT RECORDS", 100, 30)
   

    // Adding content to the PDF
    doc.setFont("helvetica", "bolder");
    doc.setFontSize(19);
    doc.setTextColor("black")
    doc.text("Student Information (print this out and bring it to the school for signing)", 10, 50);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    doc.text("Name:   " + name, 20, 70);
    doc.text("Email:   " + email, 20, 85);
    doc.text("Phone:  " + phone, 20, 100);
    doc.text("Date of Birth:  " + dob, 20, 116);
    doc.text("Course:   " + course, 20, 135);
doc.text("you are about to sign and agreement with PHIBMAT university  that you will ",9, 160)
doc.text(" participate in all activities that seeks to improve in yoyur studying ", 9, 170)
doc.text("capacity, and you will  be focus no distraction at all time, obey the", 10, 180 )
doc.text("government and be submissive to your lecturers school", 10, 190)

doc.text("director sign", 12, 210)
doc.text("student sign", 150, 210)


    // Save and download the PDF
    doc.save("student.pdf");
}
window.onload = function(){
    download()
}
    

    