<?php
    $message = '';
    $error = '';
    $url = '/admin/employee/calendar/json/events.json';
    
    $array=json_decode($_POST['jsondata']);

        if(isset($_POST['submit']))
        {
                if(file_exists($url))
                {
                    $current_data = file_get_contents($url);
                    $array_data = json_decode($array, true);
                    $extra = array(
                        'id' => $_POST['id'],
                        'eventText' => $_POST['eventText'],
                        'eventDate' => $_POST['eventDate'],
                        'eventEnd' => $_POST['eventEnd']
                        );
                            $array_data[] = $extra;
                            $final_data = json_encode($array_data);
                                if(file_put_contents($url, $final_data))
                                    {
                                        $message = "Success!";
                                    }
                }
                else
                {
                    $error = 'JSON File Does Not Exist';
                }
            }
            
?>
