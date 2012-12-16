<?php

/**
 * This is the model class for table "ada_channel".
 *
 * The followings are the available columns in table 'ada_channel':
 * @property string $channel_id
 * @property string $channel_name
 * @property string $agent_id
 * @property string $up_time
 * @property integer $enabled
 * @property string $service_type
 *
 * The followings are the available model relations:
 * @property AdaBanner[] $adaBanners
 * @property AdaAgent $agent
 */
class AdaChannel extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return AdaChannel the static model class
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
		return 'ada_channel';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('agent_id', 'required'),
			array('enabled', 'numerical', 'integerOnly'=>true),
			array('channel_name', 'length', 'max'=>60),
			array('agent_id', 'length', 'max'=>11),
			array('service_type', 'length', 'max'=>32),
			array('up_time', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('channel_id, channel_name, agent_id, up_time, enabled, service_type', 'safe', 'on'=>'search'),
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
			'adaBanners' => array(self::HAS_MANY, 'AdaBanner', 'channel_id'),
			'agent' => array(self::BELONGS_TO, 'AdaAgent', 'agent_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'channel_id' => 'Channel',
			'channel_name' => 'Channel Name',
			'agent_id' => 'Agent',
			'up_time' => 'Up Time',
			'enabled' => 'Enabled',
			'service_type' => 'Service Type',
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

		$criteria->compare('channel_id',$this->channel_id,true);
		$criteria->compare('channel_name',$this->channel_name,true);
		$criteria->compare('agent_id',$this->agent_id,true);
		$criteria->compare('up_time',$this->up_time,true);
		$criteria->compare('enabled',$this->enabled);
		$criteria->compare('service_type',$this->service_type,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}