<?php

/**
 * This is the model class for table "ada_agent".
 *
 * The followings are the available columns in table 'ada_agent':
 * @property string $agent_id
 * @property string $service_type
 * @property string $agent_name
 * @property string $up_time
 * @property integer $enabled
 *
 * The followings are the available model relations:
 * @property AdaChannel[] $adaChannels
 */
class AdaAgent extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return AdaAgent the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'ada_agent';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('enabled', 'numerical', 'integerOnly'=>true),
			array('service_type, agent_name', 'length', 'max'=>60),
			array('up_time', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('agent_id, service_type, agent_name, up_time, enabled', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'adaChannels' => array(self::HAS_MANY, 'AdaChannel', 'agent_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'agent_id' => 'Agent',
			'service_type' => 'Service Type',
			'agent_name' => 'Agent Name',
			'up_time' => 'Up Time',
			'enabled' => 'Enabled',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('agent_id',$this->agent_id,true);
		$criteria->compare('service_type',$this->service_type,true);
		$criteria->compare('agent_name',$this->agent_name,true);
		$criteria->compare('up_time',$this->up_time,true);
		$criteria->compare('enabled',$this->enabled);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}