import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Guilherme',
      sobrenome: 'Fidelis',
      email: 'fidelisamigao@gmail.com',
      idade: 20,
      peso: 71,
      altura: 1.7,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
