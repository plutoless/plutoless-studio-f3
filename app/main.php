<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Main extends Controller {

    
    
    //! HTTP route post-processor
    function afterroute() {
        // Render HTML layout
        echo Template::instance()->render('main_view.php');
    }
    
    function index($f3, $args) {
        $db=$this->db;
        $f3->set('menus', $db->exec('SELECT * FROM menus ORDER BY title;'));
        $keys = array(
            /* key board construct array */
            array("id"=>"tab", "keycode"=>"9", "keysize"=>"tab", "alias"=>"Tab"),
            array("id"=>"Q", "keycode"=>"81"), 
            array("id"=>"W", "keycode"=>"87"), 
            array("id"=>"E", "keycode"=>"69"), 
            array("id"=>"R", "keycode"=>"82"),
            array("id"=>"T", "keycode"=>"84"),
            array("id"=>"Y", "keycode"=>"89"),
            array("id"=>"U", "keycode"=>"85"),
            array("id"=>"I", "keycode"=>"73"),
            array("id"=>"O", "keycode"=>"79"),
            array("id"=>"P", "keycode"=>"80"),
            array("id"=>"backspace", "keycode"=>"8", "keysize"=>"backspace", "alias"=>"BS", "keyclass"=>"key-right"),

            array("id"=>"caps", "keycode"=>"20", "keysize"=>"caps", "alias"=>"Caps"),
            array("id"=>"A", "keycode"=>"65"), 
            array("id"=>"S", "keycode"=>"83"), 
            array("id"=>"D", "keycode"=>"68"), 
            array("id"=>"F", "keycode"=>"70"),
            array("id"=>"G", "keycode"=>"71"),
            array("id"=>"H", "keycode"=>"72"),
            array("id"=>"J", "keycode"=>"74"),
            array("id"=>"K", "keycode"=>"75"),
            array("id"=>"L", "keycode"=>"76"),
            array("id"=>"enter", "keycode"=>"13", "keysize"=>"enter", "alias"=>"Enter", "keyclass"=>"key-right"),

            array("id"=>"shift-left", "keycode"=>"16", "keysize"=>"shift-left", "alias"=>"Shift"),
            array("id"=>"Z", "keycode"=>"90"), 
            array("id"=>"X", "keycode"=>"88"), 
            array("id"=>"C", "keycode"=>"67"), 
            array("id"=>"V", "keycode"=>"86"),
            array("id"=>"B", "keycode"=>"66"),
            array("id"=>"N", "keycode"=>"78"),
            array("id"=>"M", "keycode"=>"77"),
            array("id"=>"left-arrow", "keycode"=>"37", "alias"=>"<"),
            array("id"=>"right-arrow", "keycode"=>"39", "alias"=>">"),
            array("id"=>"shift-right", "keycode"=>"16", "keysize"=>"shift-right", "alias"=>"Shift", "keyclass"=>"key-right"),

            array("id"=>"ctrl", "keycode"=>"17", "keysize"=>"control", "alias"=>"Ctrl", "keyclass"=>"key-left-bottom"),
            array("id"=>"option", "keycode"=>"18", "keysize"=>"option", "alias"=>"Option", "keyclass"=>"key-bottom"),
            array("id"=>"command", "keycode"=>"31", "keysize"=>"command", "alias"=>"Cmd", "keyclass"=>"key-bottom"),
            array("id"=>"space", "keycode"=>"32", "keysize"=>"space", "alias"=>"Space", "keyclass"=>"key-bottom"), 
            array("id"=>"message", "keycode"=>"17", "keysize"=>"message", "alias"=>"Message", "keyclass"=>"key-right-bottom"),
        );
        $date = array(
            "month"=>date("d F"),
            "weekday"=>date("l"),
            "time"=>date("H:i")
        );
        
        
        $f3->set('rand', rand(2, 101));
        $f3->set('date', $date);
        $f3->set('keys', $keys);
    }
    
    function error($f3) {
        $log=new Log('error.log');
        $log->write($f3->get('ERROR.text'));
    }
}