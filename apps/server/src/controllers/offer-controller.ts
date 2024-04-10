import OfferService from '../services/offer-service';
import { ControllerResponse } from '../types/controller-response';
import { INTERNAL_ERROR } from './utils';

class OfferController {
  public static async getAll(): Promise<ControllerResponse> {
    try {
      return {
        success: true,
        data: await OfferService.getAll(),
      };
    } catch (error) {
      console.error(error);
      return INTERNAL_ERROR;
    }
  }
}

export default OfferController;