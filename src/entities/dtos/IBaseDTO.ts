export interface IBaseDTO {
  isValid(): boolean;
  toEntity(): any;
}
