import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { InformacoesService } from '../../services/domain/informacoes.service';
import { informacoesDto } from '../../models/informacoes.dto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@IonicPage()
@Component({
  selector: 'page-informacoes',
  templateUrl: 'informacoes.html',
})
export class InformacoesPage implements OnInit {

  @ViewChild('barCanvas') barCanvas;

  barChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public informacoesService: InformacoesService) {
  }

  ngOnInit(): void {
    this.barChart = this.getBarChart();
  }


  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }


  async getBarChart(){

    const data = await Promise.all([
      this.informacoesService.findAllClientes(),
      this.informacoesService.findAllPedidos(),
      this.informacoesService.findAllProdutos(),
      this.informacoesService.findAllCategorias(),
    ])
      .then( resp => {

        return {
          labels: ['Clientes', 'Pedidos', 'Produtos', 'Categorias'],
          datasets: [{
            label: 'Registrado no sistema',
            data: [resp[0],resp[1],resp[2],resp[3]],
            backgroundColor: [
              'rgb(255, 0, 0)',
              'rgb(20, 0, 255)',
              'rgb(255, 230, 0)',
              'rgb(0, 255, 10)'
            ],
            borderWidth: 1,
          }]
        }
      })
      .catch(console.log) 

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

}
