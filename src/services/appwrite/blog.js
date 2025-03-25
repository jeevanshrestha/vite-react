 import conf from "../../conf/conf";
 import { Client, ID, Databases, Storage, Query } from 'appwrite';

 export class BlogService {
     client = new Client();
     databases;
     bucket;


     constructor() {
         this.client
             .setEndpoint(conf.appwrite_url)
             .setProject(conf.appwrite_project_id);
         this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client);
     }


     async createBlog({ title, slug, content, featuredImage, status, userid }) {
         try {
             return await this.databases.createDocument(
                 conf.appwrite_database_id,
                 conf.appwrite_collection_id,
                 slug, {
                     title,
                     content,
                     featuredImage,
                     status,
                     userid,
                 })
         } catch (error) {
             console.log("Service Appwrite:: Blog:: createBlog ::error", error);
         }
     }

     async updateBlog(slug, { title, content, featuredImage, status }) {
         try {
             return await this.databases.updateDocument(
                 conf.appwrite_database_id,
                 conf.appwrite_collection_id,
                 slug, {
                     title,
                     content,
                     featuredImage,
                     status,
                 })

         } catch (error) {
             console.log("Service Appwrite:: Blog:: updateBlog ::error", error);
         }
     }

     async deleteBlog(slug) {
         try {
             await this.databases.deleteDocument(
                 conf.appwrite_database_id,
                 conf.appwrite_collection_id,
                 slug
             )
             return true;
         } catch (error) {
             console.log("Service Appwrite:: Blog:: deleteBlog ::error", error);
             return false;
         }
     }

     async getPosts(queries = [Query.equal("status", "active")]) {
         try {
             return await this.databases.listDocuments(
                 conf.appwrite_database_id,
                 conf.appwrite_collection_id,
                 queries,


             )
         } catch (error) {
             console.log("Appwrite serive :: getPosts :: error", error);
             return false
         }
     }

     async getPost(slug) {

         try {
             const post = await this.databases.getDocument(
                 conf.appwrite_database_id,
                 conf.appwrite_collection_id,
                 slug
             )
             return post;

         } catch (error) {
             console.log("Service Appwrite:: Blog:: getPost ::error", error);

         }
     }

     async uploadImage(file) {
         try {
             return await this.bucket.createFile(
                 conf.appwrite_bucket_id,
                 ID.unique(),
                 file);
         } catch (error) {
             console.log("Service Appwrite:: Blog:: uploadImage ::error", error);
         }
     }

     async deleteImage(fileId) {

         try {
             return await this.bucket.deleteFile(
                 conf.appwrite_bucket_id,
                 fileId
             );
             return true;
         } catch (error) {
             console.log("Service Appwrite:: Blog:: deleteImage ::error", error);

             return false;
         }
     }

     getFilePreview(fileId) {
         return this.bucket.getFilePreview(
             conf.appwrite_bucket_id,
             fileId
         )
     }

 }

 const blogService = new BlogService();

 export default blogService;