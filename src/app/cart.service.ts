import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './localstorage.service';
import { Detail } from './details/details.component';

const cartStr = 'Cart';

@Injectable()
export class CartService {

  constructor(private http: HttpClient) {}

  static saveToCartLocal(goods: Detail[]) {
    LocalStorageService.save(cartStr, JSON.stringify(goods));
  }

  static addToCartLocal(good: Detail) {
    const goods = JSON.parse(LocalStorageService.get(cartStr));
    if (goods === null) {
      LocalStorageService.save(cartStr, JSON.stringify([good]));
    } else {
      goods.push(good);
      LocalStorageService.save(cartStr, JSON.stringify(goods));
    }
  }

  static getGoodsFromLocalCart(): Detail[] {
    return JSON.parse(LocalStorageService.get(cartStr));
  }

  static cleanCart(): Boolean {
    LocalStorageService.remove(cartStr);
    return true;
  }

  static removeFromCartLocal(detail: Detail): Boolean {
    const details: Detail[] = JSON.parse(LocalStorageService.get(cartStr));

    const index = details.indexOf(detail, 0);
    if (index > -1) {
      details.splice(index, 1);
    }

    CartService.cleanCart();
    CartService.saveToCartLocal(details);

    return true;
  }
}
