import { TQueryParam, TResponseRedux, TSemester } from "../../../types";

import { baseApi } from "../../api/baseApi";

const couseManagementApi =  baseApi.injectEndpoints({
    endpoints :(builder)=>({
        getAllRegisteredSemesters: builder.query({
            query: (args) => {
              const params = new URLSearchParams();
      
              if (args) {
                args.forEach((item: TQueryParam) => {
                  params.append(item.name, item.value as string);
                });
              }
      
              return {
                url: '/semester-registrations',
                method: 'GET',
                params: params,
              };
            },
            providesTags: ['semester'],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
              return {
                data: response.data,
                meta: response.meta,
              };
            },
          }),
        createSemesterRegister: builder.mutation({
            query:(data) =>({
                url:"/semester-registrations/create-semester-registration",
                method:"POST",
                body:data
            }),
            invalidatesTags:['semester']
        }),
        updateRegisterSemester: builder.mutation({
            query:(args) =>({
                url:`/semester-registrations/${args.id}`,
                method:"PATCH",
                body:args.data,
                
            }),
            invalidatesTags:['semester']
        }),
        getAllCourses: builder.query({
          query: (args) => {
            const params = new URLSearchParams();
    
            if (args) {
              args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
              });
            }
    
            return {
              url: '/courses',
              method: 'GET',
              params: params,
            };
          },
          providesTags: ['courses'],
          transformResponse: (response: TResponseRedux<any>) => {
            return {
              data: response.data,
              meta: response.meta,
            };
          },
        }),
      createCourse:builder.mutation({
        query:(data)=>({
          url: `/courses/create-course`,
          method:'POST',
          body:data,
        }),
        invalidatesTags: ['courses'],
      }),
      addFaculties:builder.mutation({
        query:(args)=>({
          url: `/courses/${args.courseId}/assign-faculties`,
          method:'PUT',
          body:args.data,
        }),
        invalidatesTags: ['courses'],
      }),
      getCourseFaculties: builder.query({
        query: (id) => {
          return {
            url: `/courses/${id}/get-faculties`,
            method: 'GET',
          };
        },
        transformResponse: (response: TResponseRedux<any>) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
      }),
      createOfferedCourse: builder.mutation({
        query: (data) => ({
          url: `offered-courses/create-offered-course`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['courses'],
      }),

    }),
});
export const {useGetAllRegisteredSemestersQuery,
  useCreateSemesterRegisterMutation,
  useUpdateRegisterSemesterMutation,
useGetAllCoursesQuery,
useCreateCourseMutation,
useAddFacultiesMutation,
useGetCourseFacultiesQuery,
useCreateOfferedCourseMutation
}=couseManagementApi;