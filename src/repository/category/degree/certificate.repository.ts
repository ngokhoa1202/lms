import Certificate, { ICertificateDocument, ICertificateModel } from '@src/model/category/degree/certificate.model';
import { BaseRepository, IBaseRepository } from '@src/repository/base/base.repository';

export class CertificateRepository extends BaseRepository<ICertificateDocument, ICertificateModel>
  implements IBaseRepository<ICertificateModel> {

  protected readonly model = Certificate;

}
