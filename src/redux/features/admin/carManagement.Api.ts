import { baseApi } from "@/redux/api/baseApi";
import { ICar } from "@/types/car.type";
import { TQueryParam, TResponseRedux } from "@/types/global";

const carManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/cars',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<ICar[]>) => {
        return {
          data:response.data,
          meta:response.meta
        }
      },
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars/create-car",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useCreateCarMutation,useGetAllCarsQuery} = carManagementApi;
