'use strict';
const _STRING = 'string';
const _NUMBER = 'number';
const _BOOLEAN = 'boolean';
const _URL = 'url';
const _JSON = 'json';
const _OBJECT = 'object';
class Validator{
    constructor(){
        return this;
    };
    validateString(value,name,silent){
        this._validate(value,_STRING,name,silent);
    };
    validateNumber(value,name,silent){
        this._validate(value,_NUMBER,name,silent);
    };
    validateBoolean(value,name,silent){
        this._validate(value,_BOOLEAN,name,silent);
    };
    validateObject(value,name,silent){
        this._validate(value,_OBJECT,name,silent);
    };
    validateUrl(value,name,silent){
        this._validate(value,_URL,name,silent);
    };
    validateJson(value,name,silent){
        this._validate(value,_JSON,name,silent);
    };
    _validate(value, type,field,silent)
    {
        if(silent===undefined){
            silent = false;
        }
        if(value === undefined){
            throw new Error(field+' is '+undefined);
        }
        var msg='';
        if(!field){
            field = 'Some '+ type;
        }
        try{
            switch (type) {
                case _JSON:
                    if(_innerValidateJSON(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _OBJECT:
                    if(_innerValidateObject(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _URL:
                    if(_innerValidateUrl(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _BOOLEAN:
                    if(_innerValidateBoolean(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _NUMBER:

                    if(_innerValidateNumber(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _STRING:
                    if(_innerValidateString(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                default:
                    throw new Error('Unknown datatype "'+type+'"');
            }
        }catch(e){
            if(typeof e === _STRING){
                var error = new Error();
                error.message = e;
                error.data = {type:type,name:field};
                if(!silent){
                    error.data.value = value;
                }
                throw error;
            }
            throw e;
        }

        function _innerValidateString(value){

            return typeof value === _STRING;
        }
        function _innerValidateNumber(value){
            if(isNaN(value)){
                throw new Error('Value is NaN');
            }
            if(parseInt(value)== new Number(value) || parseFloat(value)== new Number(value)){
                return true;
            }
            return false;
        }
        function _innerValidateBoolean(value){
            return typeof value === _BOOLEAN;
        }
        function _innerValidateObject(value){
            return typeof value === _OBJECT;
        }
        function _innerValidateUrl(value){
            if(typeof value === _STRING){
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return regexp.test(value);
            }
        }
        function _innerValidateJSON(value){
            _innerValidateString(value);
            try{
                value = JSON.parse(value);
                return _innerValidateObject(value);
            }catch (e) {
                return false;
            }
        }
        function _typeErrorMessage(value,type,field){
            var text = '';
            if(field){
                text = field+" must be of type "+type+", "+typeof value+" given.";
            }else{
                text = 'Data type "'+type+'" was expected, '+typeof value+' received instead';
            }
            return new Error(text);
        }
        return true;
    };
};
module.exports=Validator;