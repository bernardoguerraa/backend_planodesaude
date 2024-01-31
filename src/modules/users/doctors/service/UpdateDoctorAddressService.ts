import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from "tsyringe";
import DoctorRepository from "../../repository/DoctorRepository";
import Service from "../../../../database/repositories/Services";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";
interface UpdateDoctorServiceParams {
    id: string;
    streetName: string;
    number: number;
    city: string;
    state: string;
    neighbourhood: string;
    cep: number;
}

@injectable()
export class UpdateDoctorAddressService implements Service<UpdateDoctorServiceParams, Doctor>
{
    private doctorRepository: DoctorRepository;
    constructor(
        @inject('DoctorRepository')
        doctorRepository: DoctorRepository
    ) {
        this.doctorRepository = doctorRepository;
    }
    async execute({
        id,
        city,
        neighbourhood,
        number,
        state,
        streetName,
        cep
    }: UpdateDoctorServiceParams): Promise<Doctor> {
        const existingProfile = await this.doctorRepository.findDoctorById(id);
        if (!existingProfile) {
            throw new EntityPersistanceError("Doutor nao encontrado");
        }

        const updateDoctor = await this.doctorRepository.updateAddress(
            existingProfile,
            streetName,
            number,
            neighbourhood,
            city,
            state,
            cep
        );
        return updateDoctor;
    }
}