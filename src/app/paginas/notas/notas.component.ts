import { Component } from '@angular/core';
import { Nota } from 'src/app/interfaces/nota';
import { NotaService } from 'src/app/servicios/nota.service';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent {
  notas : Nota[] = [];
  id: string | null ='';
  displayedColumns: string[] = [ 'nombre', 'evaluacion', 'nota','gestion'];
  constructor(private notasService: NotaService,private route: ActivatedRoute){
    
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      // You can now use the personId in your component
      console.log(this.id);
    });

    this.notasService.obtenerDatos(this.id!).subscribe(
      (data) => this.notas = data,
      error => console.log(error),
      () => console.log("FIN")
    )
  }
}
