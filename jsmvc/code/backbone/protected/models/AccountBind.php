<?php

/**
 * This is the model class for table "account_bind".
 *
 * The followings are the available columns in table 'account_bind':
 * @property integer $agent_id
 * @property integer $channel_id
 * @property integer $banner_id
 * @property integer $notification
 * @property integer $bound_accounts
 * @property integer $regs
 * @property integer $ntf_event
 * @property string $log_date
 */
class AccountBind extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return AccountBind the static model class
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
		return 'account_bind';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('agent_id, channel_id, banner_id, notification, bound_accounts, regs, ntf_event, log_date', 'required'),
			array('agent_id, channel_id, banner_id, notification, bound_accounts, regs, ntf_event', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('agent_id, channel_id, banner_id, notification, bound_accounts, regs, ntf_event, log_date', 'safe', 'on'=>'search'),
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
			'notification' => 'Notification',
			'bound_accounts' => 'Bound Accounts',
			'regs' => 'Regs',
			'ntf_event' => 'Ntf Event',
			'log_date' => 'Log Date',
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
		$criteria->compare('notification',$this->notification);
		$criteria->compare('bound_accounts',$this->bound_accounts);
		$criteria->compare('regs',$this->regs);
		$criteria->compare('ntf_event',$this->ntf_event);
		$criteria->compare('log_date',$this->log_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}