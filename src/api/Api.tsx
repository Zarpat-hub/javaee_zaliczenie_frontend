import axios from "axios";
import { AppUser } from "../components/login.component";
import { Product } from "../components/products-cards.component";

type ProductDTO = {
  name?: string;
  price?: number;
  image?: File;
};

type OrderDTO = {
  productIds: number[];
  username: string;
};

type Role = {
  id: number;
  name: string;
};

export type User = {
  id?: number;
  username?: string;
  roles?: Role[];
};

export class Api {
  static async getProduct(id?: number) {
    const { data, status } = await axios.get<Product>(
      `http://localhost:8080/api/products/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return data;
  }
  static async getAllProducts() {
    const { data, status } = await axios.get<Product[]>(
      `http://localhost:8080/api/products/`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return data;
  }

  static async postProduct(product: ProductDTO) {
    const formData = new FormData();
    formData.append("image", product!.image!);
    formData.append("name", product!.name!);
    formData.append("price", product!.price!.toString());

    const { data } = await axios.post<ProductDTO>(
      `http://localhost:8080/api/products/`,
      formData
    );
  }

  static async updateProduct(id: number, product: ProductDTO) {
    const formData = new FormData();
    const existingProduct = this.getProduct(id);
    formData.append(
      "image",
      product.image ?? (await existingProduct)!.image!.toString()
    );
    formData.append("name", product.name ?? (await existingProduct)!.name!);
    formData.append(
      "price",
      product.price?.toString() ?? (await existingProduct!).price!.toString()
    );

    const { data } = await axios.put<ProductDTO>(
      `http://localhost:8080/api/products/${id}`,
      formData
    );
  }

  static async deleteProduct(id: number) {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
  }

  static async attemptLogin(user: AppUser) {
    const { data } = await axios.post<AppUser>(
      `http://localhost:8080/api/authenticate/login`,
      { username: user.username, password: user.password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return data;
  }

  static async getCurrentUserDetails(thisUsername: String) {
    const { data } = await axios.get<User>(
      `http://localhost:8080/api/users/details`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: `${thisUsername}`,
        },
      }
    );

    return data;
  }

  static async makeOrder(ids: number[]) {
    try {
      const { data } = await axios.post<OrderDTO>(
        `http://localhost:8080/api/orders`,
        { productIds: ids, username: localStorage.getItem("username") },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return data;
    } catch (exception) {
      console.log(exception);
    }
  }

  static async searchByName(name: string) {
    const { data } = await axios.get<Product[]>(
      `http://localhost:8080/api/products/like/${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return data;
  }
}
