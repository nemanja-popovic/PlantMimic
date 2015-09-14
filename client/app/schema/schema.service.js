'use strict';

angular.module('plantMimicApp')
  .factory('Schema', function Schema(SchemaREST, $http) {
    
    var getSchemas = function getSchema() {
        return SchemaREST.query();
    };
    var getSchema = function getSchema(params) {
        return SchemaREST.get(params);
    };
    var createSchema = function getSchema(schema) {
        return SchemaREST.save(schema);
    };
    var updateSchema = function getSchema(id, schema) {
        return SchemaREST.update(id, schema);
    };
    var deleteSchema = function getSchema(id) {
        return SchemaREST.remove(id);
    };
    var uploadImage = function uploadImage(img) {
        var formData = new FormData();
        formData.append('file', img);
        
        $http.post('/api/schema', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };
    
    return {
        getSchemas: getSchemas,
        getSchema: getSchema,
        createSchema: createSchema,
        updateSchema: updateSchema,
        deleteSchema: deleteSchema,
        uploadImage: uploadImage
    };
});
