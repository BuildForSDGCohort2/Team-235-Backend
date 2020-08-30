export interface Mapper<DTO, Model>{
    mapFromModel(model: Model): DTO
}