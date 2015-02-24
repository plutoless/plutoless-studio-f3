<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Project extends Controller {

    
    function beforeroute() {
    }
    
    //! HTTP route post-processor
    function afterroute() {
        // Render HTML layout
        echo Template::instance()->render('project_view.php');
    }
    
    function view($f3, $args) {
        $db=$this->db;
        $f3->set('projects', $db->exec('SELECT * FROM projects'));
    }
    
    function error($f3) {
        $log=new Log('error.log');
        $log->write($f3->get('ERROR.text'));
    }
}