<!--- https://www.youtube.com/watch?v=uWOUFeJlkY0&ab_channel=Webslesson --->

<?php
    $message = "";
    $error = "";
        if(isset($_POST["submit"]))
        {
                if(file_exists("/admin/employee/calendar/json/events.json"))
                {
                    $current_data = file_get_contents("/admin/employee/calendar/json/events.json");
                    $array_data = json_decode($current_data, true);
                    $extra = array(
                        'id' => $_POST["id"],
                        'eventText' => $_POST["eventText"],
                        'eventDate' => $_POST["eventDate"],
                        'eventEnd' => $_POST["eventEnd"]
                        );
                            $array_data[] = $extra;
                            $final_data = json_encode($array_data);
                                if(file_put_contents("/admin/employee/calendar/json/events.json", $final_data))
                                    {
                                        $message = "Success!";
                                    }
                }
                else
                {
                    $error = "JSON File Does Not Exist";
                }
            }
            
?>

<!------https://www.youtube.com/watch?v=jd6KSMpc9F4&ab_channel=DigitalFox---->

