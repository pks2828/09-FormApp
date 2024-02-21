import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //Importarlo para directivas y enlazar con el formulario


const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('',), //Valor inicial y validaciones
  //   price: new FormControl(0,), //Valor inicial y validaciones
  //   inStorage: new FormControl(0,), //Valor inicial y validaciones

  // });

  public myForm: FormGroup = this.fb.group({//objeto myForm
    name: ['', [ Validators.required, Validators.minLength(3) ] ], //propiedades del objeto
    price: [0, [Validators.required, Validators.min(0) ] ], //propiedades del objeto
    inStorage: [0, [ Validators.required, Validators.min(0) ] ], //propiedades del objeto
  })

  constructor ( private fb: FormBuilder ){}

  ngOnInit(): void {
    // this.myForm.reset(rtx5090 )
  }

  isValidField( field:string ): boolean | null{
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors  || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'este field es requerido';

        case 'minlength':
          return `Minimos ${errors['minlength'].requiredLength } caracteres.`;
      }
    }

    return null;

  }

  onSave():void{

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched()
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 10, inStorage: 0});

  }

}
