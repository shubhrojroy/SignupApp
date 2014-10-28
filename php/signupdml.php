<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if (!isset($_GET['action']))
{
   $result = array("success"=>false, "message"=>"Illegal Call");
   echo json_encode($result);
}
$action = $_GET['action'];

$con=mysqli_connect("localhost","root","","och");

// Check connection
if (mysqli_connect_errno()) 
{
  $result = array("success"=>false, "message"=>mysqli_connect_error());
  echo json_encode($result);
}

switch($action) {

  case "reset":
   // Truncate base table
   $dbresult = mysqli_query($con,"truncate table friday_lunch");
   $dbresult = mysqli_query($con,"select * from friday_lunch");  // Validate base table is empty
   if(mysqli_num_rows($dbresult) > 0)
      $result= array("success"=>false, "message"=>"Truncate Failed"); // Recovery nopt feasible
   else
   {
      // Copy empids from master table to lunch table
      $dbresult = mysqli_query($con,"insert into friday_lunch select emp_id, emp_eml, false from och_master"); 
	  if (mysqli_affected_rows($con)>0)
         $result= array("success"=>true, "message"=>mysqli_affected_rows($con)); // Return total count
      else
         $result= array("success"=>false, "message"=>"Insert Failed"); // Master table empty or base table deleted
   }
   break;
   
  case "getcnt":
     $dbresult=mysqli_query($con, "select * from friday_lunch where attended=true");
     $result=array("success"=>true, "message"=>mysqli_num_rows($dbresult));
     break;
	 
  case "checkin":
   $empid = $_POST['empid'];
   $email = $_POST['email'];
   if ($empid<>'')
   {
      $query1 = 'select emp_name from och_master where emp_id='.$empid;
      $query2 = 'update  friday_lunch set attended = true where emp_id='.$empid;
   }
   else
   {
      $query1 = "select emp_name from och_master where emp_eml='".$email."'";
      $query2 = "update  friday_lunch set attended = true where emp_eml='".$email."'";
   }	
   $dbresult = mysqli_query($con, $query1);
   if(mysqli_num_rows($dbresult)==0)
      $result= array("success"=>false, "message"=>"Not Found");
   else
   {
      $row=mysqli_fetch_array($dbresult);	  
      $dbresult = mysqli_query($con, $query2);
	  if (mysqli_affected_rows($con)>0)
         $result= array("success"=>true, "message"=>$row['emp_name']);
      else
         $result= array("success"=>false, "message"=>"Already CheckedIn");
   } 
   break;
   
  case "new":
     $empid = $_POST['empid'];
	 $empname = $_POST['name'];
	 $email = $_POST['email'];
	 $mgreml = $_POST['mgreml'];
	 $ochyr = $_POST['ochyr'];
	 $dob = $_POST['dob'];
	 
	 //$checkin = $_POST['checkin'];
	 
	 $query1 = "insert into och_master values (".$empid.",'".$empname."','".$email."','".$mgreml."',STR_TO_DATE('".$dob."','%m/%d/%Y'),'".$ochyr."')";
	 $dbresult = mysqli_query($con, $query1);
	 if (mysqli_affected_rows($con)>0)
	  {
		     $query2="insert into friday_lunch values (".$empid.",'".$email."',true)";
			 $dbresult = mysqli_query($con, $query2);
			 if (mysqli_affected_rows($con)>0)
                 $result= array("success"=>true, "message"=>$empname); // Return total count
             else
                 $result= array("success"=>false, "message"=>"Checkin Failed!"); // Master table empty or base table deleted
	  }
     else
         $result= array("success"=>false, "message"=>"Insert Failed"); // Master table empty or base table deleted	 
	 
     break;
	 
  default:
     $result= array("success"=>false, "message"=>"Unknown Action");
}

mysqli_close($con);
echo json_encode($result);

?>