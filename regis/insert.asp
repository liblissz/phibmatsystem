<%
On Error Resume Next

' Declare variables
Dim con, sql, firstName, email, Phone, DOB, course

' Get form values
DOB = Trim(Request.Form("DOB"))
course = Trim(Request.Form("Department"))
Phone = Trim(Request.Form("Phone"))
firstName = Trim(Request.Form("Name"))
email = Trim(Request.Form("Email"))

' Check if values are empty
If firstName = "" OR email = "" OR Phone = "" OR DOB = "" or course = "" Then
    Response.Write "❌ Error: ALL fields are required!"
    Response.End
End If

' Create Connection Object
Set con = Server.CreateObject("ADODB.Connection")

' Define Connection String
con.ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\inetpub\wwwroot\register.accdb;Persist Security Info=False;"

' Open Database Connection
con.Open

' Check for connection errors
If Err.Number <> 0 Then
    Response.Write "❌ Connection failed!<br>Error: " & Err.Description
    Response.End
End If

' Create SQL Insert Query
sql = "INSERT INTO student (Name, Email, Phone, DOB, Department) VALUES ('" & firstName & "', '" & email & "',  '" & Phone & "', '" & DOB & "', '" & course & "')"

' Execute SQL Query
con.Execute sql

' Check for errors
If Err.Number = 0 Then
    Response.Write "✅ Data inserted successfully!"
Else
    Response.Write "❌ Data insertion failed!<br>Error: " & Err.Description
End If

' Close Connection
con.Close
Set con = Nothing
%>
