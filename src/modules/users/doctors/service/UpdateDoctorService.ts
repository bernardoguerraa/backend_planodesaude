import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from "tsyringe";
import DoctorRepository from "../../repository/DoctorRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateDoctorServiceParams {
    id: string;
    name: string;
    cpf: number;
    rg: string;
    phoneNumber: number;
    dateOfBirth: Date;
    avatar: string;
}

@injectable()
export class UpdateDoctorService implements Service<UpdateDoctorServiceParams, Doctor>
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
        name,
        cpf,
        dateOfBirth,
        phoneNumber,
        avatar,
        rg,
    }: UpdateDoctorServiceParams): Promise<Doctor> {
        const existingProfile = await this.doctorRepository.findDoctorById(id);
        if (!existingProfile) {
            throw new EntityPersistanceError("Usuario nao encontrado");
        }
        const updateDoctor = await this.doctorRepository.update(
            existingProfile,
            name,
            cpf,
            dateOfBirth,
            phoneNumber,
            avatar,
            rg,
        );
        return updateDoctor;
    }
}