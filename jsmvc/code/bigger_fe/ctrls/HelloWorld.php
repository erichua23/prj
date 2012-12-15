<?php
class HelloWorld extends Ctrls{
    public function actionHw(){
        $modelX = new ModelX();
        $modelY = new ModelY();

        $helloList = $modelX->findAll();
        $worldList = $modelX->findAll();

        $this->render('HelloWorld', array(
            'helloList' => $helloList,
            'worldList' => $worldList
        ));
    }
}
