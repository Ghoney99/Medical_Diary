package com.project.teamproject.service;

import com.project.teamproject.domain.entity.UserEntity;
//import com.project.teamproject.domain.entity.UserRole;
import com.project.teamproject.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserSecurityService implements UserDetailsService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        Optional<UserEntity> _userEntity = userRepository.findByid(id);

        if(_userEntity.isEmpty()){
            throw new UsernameNotFoundException("No User Information.");
        }

        UserEntity userEntity = _userEntity.get();
        List<GrantedAuthority> authorities = new ArrayList<>();

        String bcryptedPassword = passwordEncoder.encode(userEntity.getPw());
        if ("admin".equals(id)) {
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("USER"));
        }
        return new User(userEntity.getId(), bcryptedPassword, authorities);
    }
}
