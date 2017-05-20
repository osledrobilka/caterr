import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as actions from '../actions';
import { Card, CustomButton, BlurredView } from './common';

class CreateHostForm extends Component {
    
