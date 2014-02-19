<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller {
    protected $db;
    
    function beforeroute($f3) {
        $db=$this->db;
        
    }
    
    function  afterroute($f3) {
        
    }
    
    function __construct() {
        $f3=Base::instance();
        $db=new DB\SQL(
                $f3->get('db'),
                $f3->get('db_user'),
                $f3->get('db_pass')
                );
        new DB\SQL\Session($db);
        $this->db=$db;
        
    }
}