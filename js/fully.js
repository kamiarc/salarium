var fully = {
	logged : false,


	login : function(_a,_b){
		$.post('actions/login.php',{
			username: _a,
			password: _b
		},function(_ret){

		});
	},


	getEmpresas: function(){
		$.get('actions/empresas.php',function(_ret){
			var result = JSON.parse(_ret);
			var list = $('#company_list');
			var _cur = null;
			$.each(result,function(a,b){
				if((a-1) % 2 == 0) {
					_cur = $('<div class="4u"></div>');
					list.append(_cur);
				}
				$(_cur).append('<article class="item"><a><img class="company_img" src="'+b.img+'" /></a><header><h3>'+b.name+'</h3></header></article>');
			});
		});
	},

	validateCPF: function(cpf){
		cpf = cpf.replace(/[^\d]+/g,'');
		if(cpf == '') return false;
		//Elimina CPFs invalidos conhecidos
		if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" ||
			cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" ||
			cpf == "99999999999") return false;
		//Valida 1o digito
		add = 0;
		for (i=0; i < 9; i ++) add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11) rev = 0;
		if (rev != parseInt(cpf.charAt(9))) return false;
		// Valida 2o digito
		add = 0;
		for (i = 0; i < 10; i ++) add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11) rev = 0;
		if (rev != parseInt(cpf.charAt(10))) return false;
		return true;
	},

	validations: function(){
		var _self = this;
		$('#reg_CPF').on('keyup',function(){
			if( _self.validateCPF($(this).val()) ) _self.setOk('reg_CPF');
			else _self.setFalse('reg_CPF');
		});
	},

	setOk: function(_target){
		if( $('#'+_target).next().attr('class') == 'validator ok' ) return true;
		else{
			if( $('#'+_target).next().attr('class') == 'validator nok' ) $('#'+_target).next().attr('class','validator ok');
			else{
				$('<div class="validator ok"></div>').insertAfter('#'+_target);
			}
		}
	},
	setFalse: function(_target){
		if( $('#'+_target).next().attr('class') == 'validator nok' ) return true;
		else{
			if( $('#'+_target).next().attr('class') == 'validator ok' ) $('#'+_target).next().attr('class','validator nok');
			else{
				$('<div class="validator nok"></div>').insertAfter('#'+_target);
			}
		}
	}
}

fully.getEmpresas();
$(document).ready(function(){fully.validations();});