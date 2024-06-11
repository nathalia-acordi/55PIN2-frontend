package literaconnect.literaconect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import literaconnect.literaconect.dto.LivroDTO;
import literaconnect.literaconect.service.LivroService;

@RestController
@RequestMapping("/api/livros")	
public class LivrosControladora {
	
	@Autowired
	private LivroService servico;
	
	@GetMapping
	public List<LivroDTO> obterLivros() {
		return servico.obterTodasOsLivros();
	}
	
	@GetMapping("/ultimos-lancamentos")
	public List<LivroDTO> obterUltimosLancamentos() {
		return servico.obterUltimosLancamentosService();
	}
	
	@GetMapping("/livros-em-destaque")
	public List<LivroDTO> obterLivrosEmDestaque() {
		return servico.obterLivrosEmDestaque();
	}
	
}
