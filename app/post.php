<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Post extends Controller {

    
    function beforeroute() {
        $feed = 'http://stackoverflow.com/opensearch.xml';
        $feed_to_array = (array) simplexml_load_file($feed);
    }
    
    //! HTTP route post-processor
    function afterroute() {
        // Render HTML layout
        echo Template::instance()->render('post_view.php');
    }
    
    function view($f3, $args) {
        $db=$this->db;
    }
    
    function error($f3) {
        $log=new Log('error.log');
        $log->write($f3->get('ERROR.text'));
    }
}