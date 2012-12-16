<?php

/**
 * This is the model class for table "ordinary_cvs".
 *
 * The followings are the available columns in table 'ordinary_cvs':
 * @property integer $agent_id
 * @property integer $channel_id
 * @property integer $banner_id
 * @property integer $clicks
 * @property integer $visitors
 * @property integer $regs
 * @property integer $characters
 * @property double $total_payment
 * @property string $log_date
 * @property integer $logins_action
 * @property integer $logins_user
 * @property string $service_type
 */
class OrdinaryCvs extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return OrdinaryCvs the static model class
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
		return 'ordinary_cvs';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('agent_id, channel_id, banner_id, clicks, visitors, regs, characters, total_payment, log_date, logins_action, logins_user', 'required'),
			array('agent_id, channel_id, banner_id, clicks, visitors, regs, characters, logins_action, logins_user', 'numerical', 'integerOnly'=>true),
			array('total_payment', 'numerical'),
			array('service_type', 'length', 'max'=>32),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('agent_id, channel_id, banner_id, clicks, visitors, regs, characters, total_payment, log_date, logins_action, logins_user, service_type', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'agent_id' => 'Agent',
			'channel_id' => 'Channel',
			'banner_id' => 'Banner',
			'clicks' => 'Clicks',
			'visitors' => 'Visitors',
			'regs' => 'Regs',
			'characters' => 'Characters',
			'total_payment' => 'Total Payment',
			'log_date' => 'Log Date',
			'logins_action' => 'Logins Action',
			'logins_user' => 'Logins User',
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

		$criteria->compare('agent_id',$this->agent_id);
		$criteria->compare('channel_id',$this->channel_id);
		$criteria->compare('banner_id',$this->banner_id);
		$criteria->compare('clicks',$this->clicks);
		$criteria->compare('visitors',$this->visitors);
		$criteria->compare('regs',$this->regs);
		$criteria->compare('characters',$this->characters);
		$criteria->compare('total_payment',$this->total_payment);
		$criteria->compare('log_date',$this->log_date,true);
		$criteria->compare('logins_action',$this->logins_action);
		$criteria->compare('logins_user',$this->logins_user);
		$criteria->compare('service_type',$this->service_type,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}