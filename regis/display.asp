<% Option Explicit %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Records</title>
    <style>
  body{
        display: flex;
        justify-content: center;
        background: #b5A4f3 ;
        align-items: center;
    }
    td{
        padding: 12px;
    }
    table{
        width: 100%;
        
    }
</style>
</head>
<body>
    <% 
    Dim con, rs, x
    On Error Resume Next ' Enable error handling (useful for debugging)

    ' Create a connection object
    Set con = Server.CreateObject("ADODB.Connection")
    Set rs = Server.CreateObject("ADODB.Recordset")

    ' Open the connection (make sure the path is correct and no hidden characters)
    con.ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\inetpub\wwwroot\register.accdb;Persist Security Info=False;"
    
    con.Open

    ' Check if the connection was successful
    If con.State = 1 Then ' If connection state is open (1 = open)
        ' Connection was successful, proceed to execute the query
        Set rs = con.Execute("SELECT * FROM student")
        
        ' Check if the recorbdset has any data
        If rs.EOF Then
            Response.Write("No records found.")
        Else
            ' Display the data in a table
            Response.Write("<table border='1'>")
            Response.Write("<tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>DATE OF BIRTH</th><th>Department</th> </tr>")
            
            ' Loop through the recordset and display data in a table
            Do Until rs.EOF
                Response.Write("<tr>")
                
                ' Output each field's value in the table row
                Response.Write("<td>" & rs("ID") & "</td>")
                Response.Write("<td>" & rs("Name") & "</td>")
                Response.Write("<td>" & rs("Email") & "</td>")
                 Response.Write("<td>" & rs("Phone") & "</td>")
                Response.Write("<td>" & rs("DOB") & "</td>")
                 Response.Write("<td>" & rs("Department") & "</td>")
                Response.Write("</tr>")
                rs.MoveNext
            Loop
            
            Response.Write("</table>")
        End If
        
        ' Close the recordset and connection
        rs.Close
        con.Close
    Else
        ' If the connection failed, display an error message
        Response.Write("Error: Unable to connect to the database.")
    End If
    
    ' Clean up the objects
    Set rs = Nothing
    Set con = Nothing
    %>
</body>
</html>
