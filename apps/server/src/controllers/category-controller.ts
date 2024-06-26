import vine from '@vinejs/vine';
import { CategoryService, SubCategoryService } from '../services/category-service.js';
import { ControllerResponse } from '../types/controller-response.js';
import { NOT_FOUND, handleInternalError, success } from './utils.js';
import path from 'path';
import { FileUUIDSchema, SubCategoryNameSchema } from '../validators/fields-validator.js';
import CategoryIllustrationService from '../services/category-illustration-service.js';

const __appRoot = process.cwd();

class CategoryController {
  public static async getImage(uuid: string) {
    try {
      const schema = vine.object({
        uuid: FileUUIDSchema,
      });

      const validator = vine.compile(schema);
      const field = await validator.validate({ uuid });

      const image = await CategoryIllustrationService.get(field.uuid);
      if (!image) return NOT_FOUND;

      const filepath = path.join(
        __appRoot,
        CategoryIllustrationService.createPath(image.uuid, image.extension),
      );

      return success({ ...image, path: filepath });
    } catch (error) {
      return handleInternalError(error);
    }
  }

  public static async getAll(): Promise<ControllerResponse> {
    try {
      const mainCategories = await CategoryService.getAll();
      return {
        success: true,
        data: mainCategories.map((mainCategory) => ({
          ...mainCategory,
          subCategories: mainCategory.subCategories.map((subCategory) => ({
            name: subCategory.name,
            mainCategoryName: mainCategory.name,
            illustrationUUID: subCategory.illustrationUUID,
            requiresCondition: subCategory.requiresCondition,
            requiresMileage: subCategory.requiresMileage,
          })),
        })),
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }

  /**
   * Get sub category object by its name
   * @param params.name - name of the sub category
   */
  public static async getSubByName(params: {name: string}): Promise<ControllerResponse> {
    try {
      const schema = vine.object({
        name: SubCategoryNameSchema,
      });

      const validator = vine.compile(schema);
      const { name } = await validator.validate(params);

      const subCategory = await SubCategoryService.getByName(name);
      if (!subCategory) return NOT_FOUND;

      return {
        success: true,
        data: subCategory,
      };
    } catch (error) {
      return handleInternalError(error);
    }
  }
}

export default CategoryController;
