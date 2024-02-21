import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({//explica esto en el minuto 11:00 de la ultima clase de la seccion 18
    name: ['', [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ]],
    // email: ['', [Validators.required, Validators.pattern (this.validatorsService.emailPattern) ], [ new EmailValidator() ] ],
    email: ['', [Validators.required, Validators.pattern (this.validatorsService.emailPattern) ], [ this.EmailValidator ] ],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo( 'password', 'password2' )
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private EmailValidator: EmailValidator
  ) {}

  isValiedField(  field: string ){
    //TODO: obtener validacion desde un servicio
    return this.validatorsService.isValidField( this.myForm, field )
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
//HASTA AHORITA HEMOS VISTO 3 FORMAS DE REALIZAR VALIDACIONES, MEDIANTE UN SERVICIO SINCRONO, UN SERVICIO ASINCRONO Y MEDIANTE DISTINTOS ARCHIVOS CREANDO FUNCIONES
