import Doctor from "../../../../database/entities/Doctor";
import Service from "../../../../database/repositories/Services";
import BusinessRuleViolationError from "../../../../shared/aplication/error/BusinessRuleViolationError";
import DoctorRepository from "../../repository/DoctorRepository";
import { inject, injectable } from "tsyringe";
interface DeleteDoctorServiceParams {
    id: string;
}

@injectable()
export default class DeleteDoctorService
implements Service<DeleteDoctorServiceParams,void>
{
    private doctorRepository: DoctorRepository;
    constructor(
        @inject("DoctorRepository")
        doctorRepository: DoctorRepository
    ) {
        this.doctorRepository = doctorRepository;
    }
    async execute({
        id,
    }: DeleteDoctorServiceParams): Promise<void> {
        const existingDoctor = await this.doctorRepository.findDoctorById(id);

        if (!existingDoctor) {
            throw new BusinessRuleViolationError("Doutor nao encontrado");
        }

        const updateDoctor = await this.doctorRepository.delete(id);

        return updateDoctor;
    }
}