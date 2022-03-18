import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { informacoesDto } from "../../models/informacoes.dto";

@Injectable()
export class InformacoesService {

    constructor(public http: HttpClient) {
    }

    findAllCategorias() : Promise<informacoesDto>  {
      return this.http.get<informacoesDto>(`${API_CONFIG.baseUrl}/categorias/total`).toPromise();
  }

  findAllProdutos() : Promise<informacoesDto>  {
    return this.http.get<informacoesDto>(`${API_CONFIG.baseUrl}/produtos/total`).toPromise();
}

findAllClientes() : Promise<informacoesDto>  {
  return this.http.get<informacoesDto>(`${API_CONFIG.baseUrl}/clientes/total`).toPromise();
}

findAllPedidos() : Promise<informacoesDto>  {
  return this.http.get<informacoesDto>(`${API_CONFIG.baseUrl}/pedidos/total`).toPromise();
}

}
