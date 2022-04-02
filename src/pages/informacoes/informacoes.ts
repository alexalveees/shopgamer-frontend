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
  @ViewChild('barCanvas1') barCanvas1;


  barChart: any;
  barChart1: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public informacoesService: InformacoesService) {
  }

  async ngOnInit() {
    this.barChart = await this.getBarChart()[0];
    this.barChart1 = await this.getBarChart()[1];
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
      this.informacoesService.findAllCidades(),
      this.informacoesService.findAllEstados(),
    ])
      .then( resp => {

        return [{
          labels: ['Clientes', 'Pedidos', 'Produtos', 'Categorias'],
          datasets: [{
            label: 'Quantidade registrada no sistema',
            data: [resp[0],resp[1],resp[2],resp[3]],
            backgroundColor: [
              'rgb(255, 0, 0)',
              'rgb(20, 0, 255)',
              'rgb(255, 230, 0)',
              'rgb(0, 255, 10)'
            ],
            borderWidth: 1,
          }]
        },
      {
        labels: ['Cidades', 'Estados'],
          datasets: [{
            label: 'Quantidade registrada no sistema',
            data: [resp[4],resp[5]],
            backgroundColor: [
              'rgb(458, 70, 0)',
              'rgb(44, 105, 0)'
            ],
            borderWidth: 1,
          }]
      }]

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

    const dadosTabela=[this.getChart(this.barCanvas.nativeElement, 'bar', data[0], options),
    this.getChart(this.barCanvas1.nativeElement, 'bar', data[1], options)];
    return dadosTabela;

  }

}
