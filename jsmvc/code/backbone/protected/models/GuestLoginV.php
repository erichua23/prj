<?php

/**
 * This is the model class for table "guest_login_v".
 *
 * The followings are the available columns in table 'guest_login_v':
 * @property integer $agent_id
 * @property integer $channel_id
 * @property integer $banner_id
 * @property integer $clicks
 * @property integer $visitors
 * @property integer $clk_azid
 * @property integer $clk_tzid
 * @property integer $regs_azid
 * @property integer $characters_azid
 * @property integer $characters_tzid
 * @property string $log_date
 * @property string $service_type
 * @property integer $ntf2
 * @property integer $ntf3
 * @property integer $bound_accounts2
 * @property integer $bound_accounts3
 */
class GuestLoginV extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return GuestLoginV the static model class
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
		return 'guest_login_v';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('agent_id, channel_id, banner_id, clicks, visitors, clk_azid, clk_tzid, regs_azid, characters_azid, characters_tzid, log_date, ntf2, ntf3, bound_accounts2, bound_accounts3', 'required'),
			array('agent_id, channel_id, banner_id, clicks, visitors, clk_azid, clk_tzid, regs_azid, characters_azid, characters_tzid, ntf2, ntf3, bound_accounts2, bound_accounts3', 'numerical', 'integerOnly'=>true),
			array('service_type', 'length', 'max'=>32),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('agent_id, channel_id, banner_id, clicks, visitors, clk_azid, clk_tzid, regs_azid, characters_azid, characters_tzid, log_date, service_type, ntf2, ntf3, bound_accounts2, bound_accounts3', 'safe', 'on'=>'search'),
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
			'clk_azid' => 'Clk Azid',
			'clk_tzid' => 'Clk Tzid',
			'regs_azid' => 'Regs Azid',
			'characters_azid' => 'Characters Azid',
			'characters_tzid' => 'Characters Tzid',
			'log_date' => 'Log Date',
			'service_type' => 'Service Type',
			'ntf2' => 'Ntf2',
			'ntf3' => 'Ntf3',
			'bound_accounts2' => 'Bound Accounts2',
			'bound_accounts3' => 'Bound Accounts3',
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
		$criteria->compare('clk_azid',$this->clk_azid);
		$criteria->compare('clk_tzid',$this->clk_tzid);
		$criteria->compare('regs_azid',$this->regs_azid);
		$criteria->compare('characters_azid',$this->characters_azid);
		$criteria->compare('characters_tzid',$this->characters_tzid);
		$criteria->compare('log_date',$this->log_date,true);
		$criteria->compare('service_type',$this->service_type,true);
		$criteria->compare('ntf2',$this->ntf2);
		$criteria->compare('ntf3',$this->ntf3);
		$criteria->compare('bound_accounts2',$this->bound_accounts2);
		$criteria->compare('bound_accounts3',$this->bound_accounts3);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}