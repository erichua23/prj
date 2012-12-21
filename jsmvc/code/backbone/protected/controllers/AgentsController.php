<?php

class AgentsController extends Controller
{
	public function actionDelete($id)
	{
        $model = new AdaAgent();
        $row = $model->findByPk($id);
        $row->delete();
        echo CJSON::encode(array());
	}

	public function actionListAll()
	{
        $model = new AdaAgent();
        echo CJSON::encode($model->findAll());
	}

	public function actionListOne($id)
	{
        $model = new AdaAgent();
        echo CJSON::encode($model->findByPk($id));
	}

	public function actionUpdate($id)
	{
        $json = file_get_contents('php://input'); //$GLOBALS['HTTP_RAW_POST_DATA'] is not preferred: http://www.php.net/manual/en/ini.core.php#ini.always-populate-raw-post-data
        $putVars = CJSON::decode($json,true);  //true means use associative array
        
        $model = new AdaAgent();
        $row = $model->findByPk($id);
        $row->up_time = $putVars['up_time'];
        $row->save();
	}

	// Uncomment the following methods and override them if needed
	/*
	public function filters()
	{
		// return the filter configuration for this controller, e.g.:
		return array(
			'inlineFilterName',
			array(
				'class'=>'path.to.FilterClass',
				'propertyName'=>'propertyValue',
			),
		);
	}

	public function actions()
	{
		// return external action classes, e.g.:
		return array(
			'action1'=>'path.to.ActionClass',
			'action2'=>array(
				'class'=>'path.to.AnotherActionClass',
				'propertyName'=>'propertyValue',
			),
		);
	}
	*/
}
