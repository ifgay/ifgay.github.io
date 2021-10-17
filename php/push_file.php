<?php

ini_set("display_errors", "On");//打开错误提示

ini_set("error_reporting",E_ALL);//显示所有错误
$count_file=file_get_contents('count_file.txt');
$notes_content=file_get_contents('notes.json');

$notes_obj=json_decode($notes_content);

$now=date("Y-m-d");

foreach($notes_obj->fileList as $key=>$val){
    echo $val->file;
}
die();


$edit=file_get_contents("php://input");
$get_content=json_decode($edit);
$data=$get_content->edit;
$title=$get_content->title;
$desc=$get_content->desc;
    function count_file_dir($url){
        $num=0;
        $arr = glob($url);
        foreach ($arr as $v) {
            if(is_file($v)) {
                $num++;
            }
        }
        return $num;
    }
    $file_count=count_file_dir('*');
    $file_name="{$file_count}.md";
    $is_create=touch($file_name);
    if(!$is_create){
        echo json_encode(['code'=>0,'msg'=>'新文件创建失败']);
        exit();
    }
    $is_open=$stream_file=fopen($file_name,'w+');
    if(!$is_open){
        echo json_encode(['code'=>0,'msg'=>'打开文件失败']);
        exit();
    }
    $is_write=fwrite($stream_file,$data);
    if(!$is_write){
        echo json_encode(['code'=>0,'msg'=>'写入文件失败']);
        exit();
    }

    echo json_encode(['code'=>1,'file'=>$file_name]);
    

