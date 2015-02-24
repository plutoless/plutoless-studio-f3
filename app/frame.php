<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Frame extends Controller {

    
    function beforeroute() {
    }
    
    //! HTTP route post-processor
    function afterroute() {
        // Render HTML layout
        echo Template::instance()->render('frame_view.php');
    }
    
    function view($f3, $args) {
        $f3->set("src", $f3->get('PARAMS.src'));
        $db=$this->db;
        
    }
    
    function error($f3) {
        $log=new Log('error.log');
        $log->write($f3->get('ERROR.text'));
    }
}