import axios from "axios";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import { safeParse, pipe, number, string, transform, parse } from "valibot";
import { toBoolean } from "../utils";

type productData = {
  [k: string]: FormDataEntryValue;
};

const urlBase = import.meta.env.VITE_API_URL;

export const addProduct = async (data: productData) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${urlBase}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${urlBase}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Ocurrio un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: Product["id"]) => {
  try {
    const url = `${urlBase}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Ocurrio un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (data: productData, id: Product["id"]) => {
  const NumberSchema = pipe(string(), transform(Number), number());
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    const url = `${urlBase}/api/products/${id}`;
    if (result.success) {
      await axios.put(url, result.output);
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: Product["id"]) => {
  const url = `${urlBase}/api/products/${id}`;
  try {
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductAvailability = async (id: Product["id"]) => {
  try {
    const url = `${urlBase}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
};
